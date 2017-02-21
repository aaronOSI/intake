# frozen_string_literal: true
FactoryGirl.define do
  factory :phone_number, class: PhoneNumber do
    skip_create
    type { %w(Cell Home Work Other).sample }
    number { Faker::PhoneNumber.phone_number }
    after(:create) do |phone|
      phone.id = SecureRandom.random_number(1_000_000_000).to_s
    end
  end
end
