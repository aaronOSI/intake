# frozen_string_literal: true
FactoryGirl.define do
  factory :screening, class: Screening do
    skip_create

    created_at { Time.current }
    updated_at { Time.current }

    association :address, factory: :address
    participants { [] }

    after(:create) do |screening|
      screening.id = SecureRandom.random_number(1_000_000_000).to_s
    end
  end
end
