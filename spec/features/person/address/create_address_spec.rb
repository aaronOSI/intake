# frozen_string_literal: true
require 'rails_helper'

feature 'Create Address' do
  scenario 'add and remove address' do
    address1 = FactoryGirl.build(:address, state: 'CA')
    address2 = FactoryGirl.build(:address, state: 'NY')
    person = FactoryGirl.create(
      :person,
      addresses: [address1, address2]
    )

    visit new_person_path

    click_button 'Add new address'
    within '#addresses' do
      fill_in 'Address', with: address1.street_address
      fill_in 'City', with: address1.city
      select 'California', from: 'State'
      fill_in 'Zip', with: address1.zip
      select address1.type, from: 'Address Type'
    end

    click_button 'Add new address'
    within '#addresses' do
      within all('.list-item').last do
        fill_in 'Address', with: address2.street_address
        fill_in 'City', with: address2.city
        select 'New York', from: 'State'
        fill_in 'Zip', with: address2.zip
        select address2.type, from: 'Address Type'
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

  scenario 'create a person with empty address ' do
    person = FactoryGirl.create(:person, addresses: [])
    
    stub_request(:post, api_people_path)
      .with(body: person.to_json(except: :id))
      .and_return(body: person.to_json,
                  status: 201,
                  headers: { 'Content-Type' => 'application/json' })

    visit new_person_path
    click_button 'Add new address'
    click_button 'Save'
    expect(a_request(:post, api_people_path)
      .with(body: person.to_json(except: :id)))
      .to have_been_made
  end
end
