# frozen_string_literal: true
FactoryGirl.define do
  factory :address, class: Address do
    skip_create
    city { Faker::Address.city }
    state { Faker::Address.state_abbr }
    street_address { Faker::Address.street_address }
    type { %w(Home Work Other).sample }
    zip { Faker::Address.zip }
    after(:create) do |address|
      address.id = SecureRandom.random_number(1_000_000_000).to_s
    end
  end
end
