# frozen_string_literal: true
require 'rails_helper'

feature 'Create Phone Number' do
  scenario 'add and remove phone numbers on a new person' do
    phone1 = FactoryGirl.build(:phone_number)
    phone2 = FactoryGirl.build(:phone_number)
    dummy_phone = FactoryGirl.build(:phone_number)
    person = FactoryGirl.create(
      :person,
      phone_numbers: [
        phone1,
        phone2
      ]
    )
    visit new_person_path
    click_button 'Add new phone number'
    within '#phone-numbers' do
      fill_in 'Phone Number', with: phone1.number
      select phone1.type, from: 'Phone Number Type'
      expect(page).to have_link('Delete phone number')
    end

    click_button 'Add new phone number'

    within '#phone-numbers' do
      within all('.list-item').last do
        fill_in 'Phone Number', with: dummy_phone.number
        select dummy_phone.type, from: 'Phone Number Type'
        click_link 'Delete phone number'
      end
    end

    click_button 'Add new phone number'

    within '#phone-numbers' do
      within all('.list-item').last do
        fill_in 'Phone Number', with: phone2.number
        select phone2.type, from: 'Phone Number Type'
        expect(page).to have_link('Delete phone number')
      end
    end

    stub_request(:post, api_people_path)
      .with(body: person.to_json(except: :id))
      .and_return(body: person.to_json,
                  status: 201,
                  headers: { 'Content-Type' => 'application/json' })
    stub_request(:get, api_person_path(person.id))
      .and_return(body: person.to_json,
                  status: 200,
                  headers: { 'Content-Type' => 'application/json' })

    click_button 'Save'

    expect(a_request(:post, api_people_path)
      .with(body: person.to_json(except: :id)))
      .to have_been_made

    expect(page).to have_current_path(person_path(person.id))
  end

  scenario 'create a person with empty phonenumber' do
    person = FactoryGirl.create(:person, phone_numbers: [])

    # the following stub allows the user to transistion to the person show page
    stub_request(:post, api_people_path)
      .with(body: person.to_json(except: :id))
      .and_return(body: person.to_json,
                  status: 201,
                  headers: { 'Content-Type' => 'application/json' })

    visit new_person_path
    click_button 'Add new phone number'

    click_button 'Save'

    expect(a_request(:post, api_people_path)
      .with(body: person.to_json(except: :id)))
      .to have_been_made

    expect(page).to have_current_path(person_path(person.id))
  end
end
