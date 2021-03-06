# frozen_string_literal: true
require 'rails_helper'
feature 'Edit Address' do
  address = FactoryGirl.create(
    :address,
    city: 'Springfield',
    state: 'NY',
    street_address: '123 fake st',
    zip: '12345',
    type: 'Placement'
  )
  let(:person) do
    FactoryGirl.create(
      :person,
      phone_numbers: [],
      addresses: [address],
      languages: []
    )
  end

  before do
    stub_request(:get, api_person_path(person.id))
      .and_return(body: person.to_json,
                  status: 200,
                  headers: { 'Content-Type' => 'application/json' })
  end

  scenario 'when a user navigates to edit page' do
    visit edit_person_path(id: person.id)

    within '.card-header' do
      expect(page).to have_content 'EDIT BASIC DEMOGRAPHICS CARD'
    end

    within '#addresses' do
      expect(page).to have_field('Address', with: '123 fake st')
      expect(page).to have_field('City', with: 'Springfield')
      expect(page).to have_field('State', with: 'NY')
      expect(page).to have_field('Zip', with: '12345')
      expect(page).to have_field('Address Type', with: 'Placement')
    end
  end

  scenario 'when a user cancels after editing and existing address' do
    visit edit_person_path(id: person.id)
    within '#addresses' do
      within all('.list-item').first do
        fill_in 'Address', with: '711 Capital Mall'
      end
    end
    click_link 'Cancel'

    expect(page).to have_current_path(person_path(id: person.id))
    within '.card-header' do
      expect(page).to have_content('BASIC DEMOGRAPHICS CARD')
    end
    expect(page).to have_content('123 fake st')
  end

  scenario 'when a user saves after editing an existing address' do
    visit edit_person_path(id: person.id)

    within '#addresses' do
      within all('.list-item').first do
        fill_in 'Address', with: '711 Capital Mall'
        select 'Home', from: 'Address Type'
      end
    end
    person.addresses.first.street_address = '711 Capital Mall'
    person.addresses.first.type = 'Home'

    stub_request(:put, api_person_path(person.id))
      .with(body: person.to_json)
      .and_return(status: 200,
                  body: person.to_json,
                  headers: { 'Content-Type' => 'application/json' })
    stub_request(:get, api_person_path(person.id))
      .and_return(status: 200,
                  body: person.to_json,
                  headers: { 'Content-Type' => 'application/json' })

    click_button 'Save'
    expect(a_request(:put, api_person_path(person.id)).with(body: person.to_json)).to have_been_made
    expect(page).to have_current_path(person_path(id: person.id))
  end

  scenario 'when a user attempts to add a blank address' do
    visit edit_person_path(id: person.id)
    first_address = person.addresses.first
    click_button 'Add new address'

    stub_request(:put, api_person_path(person.id))
      .with(body: person.to_json)
      .and_return(status: 200,
                  body: person.to_json,
                  headers: { 'Content-Type' => 'application/json' })

    within '#addresses' do
      expect(page).to have_field('Address', with: first_address.street_address)
      expect(page).to have_field('City', with: first_address.city)
      expect(page).to have_field('State', with: first_address.state)
      expect(page).to have_field('Zip', with: first_address.zip)
      expect(page).to have_field('Address Type', with: first_address.type)

      expect(page).to have_field('Address', with: '')
      expect(page).to have_field('City', with: '')
      expect(page).to have_field('State', with: '')
      expect(page).to have_field('Zip', with: '')
      expect(page).to have_field('Address Type', with: '')
    end

    click_button 'Save'
    expect(a_request(:put, api_person_path(person.id)).with(body: person.to_json)).to have_been_made
    expect(page).to have_current_path(person_path(id: person.id))
  end
end
