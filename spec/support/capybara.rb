# frozen_string_literal: true

require 'capybara/rspec'
require 'support/capybara/screenshot'
# require 'capybara/accessible'
require 'capybara/poltergeist'
Capybara.raise_server_errors = false

# Tests must be run in the correct timezone because
# of UTC converstion and explicit expectations.
# Sincerely,
# The Time Lords
# ENV['TZ'] = 'Etc/GMT+7' # MOVE THIS TO SELENIUM CONTAINER DEFINITION

# Capybara.javascript_driver = :poltergeist
Capybara.javascript_driver = "selenium_remote".to_sym

# Capybara.register_driver "accessible_selenium_remote#{ENV['TEST_ENV_NUMBER'].to_i}".to_sym do |app|
  # driver = Capybara::Selenium::Driver.new(app, http_client: client, browser: :remote, url: "http://selenium:4444/wd/hub", desired_capabilities: { browserName: 'firefox', marionette: true, nativeEvents: true} )
  # adaptor = Capybara::Accessible::SeleniumDriverAdapter.new
  # Capybara::Accessible.setup(driver, adaptor)
# end

Capybara.register_driver "selenium_remote".to_sym do |app|
  Capybara::Selenium::Driver.new(app, browser: :remote, url: "http://selenium:4444/wd/hub", desired_capabilities: { browserName: 'firefox' } )
end
# Capybara.register_driver :accessible_selenium_remote do |app|
  # driver = Capybara::Selenium::Driver.new(app)
  # driver = Capybara::Selenium::Driver.new(app, browser: :remote, url: "http://selenium:4444/wd/hub", desired_capabilities: :firefox)
  # adaptor = Capybara::Accessible::SeleniumDriverAdapter.new
  # Capybara::Accessible.setup(driver, adaptor)
# end

if ENV['TEST_ENV_NUMBER'].is_a?(String)
  Capybara.server_port = 8889 + ENV['TEST_ENV_NUMBER'].to_i
  Capybara.server_host = '0.0.0.0'
  Capybara.app_host = "http://ca_intake:#{Capybara.server_port}"
  Capybara.default_driver = "selenium_remote".to_sym

  Capybara.default_max_wait_time = 10
end

# Allow aria-label to be used in locators
Capybara.enable_aria_label = true

# Capybara::Accessible::Auditor::Node.class_eval do
  # SELECTORS_TO_IGNORE = <<-IGNORES
    # config.ignoreSelectors('badAriaAttributeValue', '[id$=_cal]');
    # config.ignoreSelectors('badAriaAttributeValue', '[id$=_input');
    # config.ignoreSelectors('badAriaAttributeValue', '[id$=_time_listbox');
    # config.ignoreSelectors('badAriaAttributeValue', '[id=spec_meta');
  # IGNORES

  # def perform_audit_script
    # <<-JAVASCRIPT
    # #{audit_rules}
        # var config = new axs.AuditConfiguration();
        # var severe_rules = #{severe_rules.to_json};
        # var rule;
        # for(rule in severe_rules) {
          # config.setSeverity(severe_rules[rule], axs.constants.Severity.SEVERE);
        # }
        # config.auditRulesToIgnore = #{excluded_rules.to_json};
        # #{SELECTORS_TO_IGNORE}
        # var results = axs.Audit.run(config);
    # JAVASCRIPT
  # end
# end

# Capybara::Accessible::Auditor::Driver.class_eval do
  # def perform_audit_script
    # <<-JAVASCRIPT
    # #{audit_rules}
        # var config = new axs.AuditConfiguration();
        # var severe_rules = #{severe_rules.to_json};
        # var rule;
        # for(rule in severe_rules) {
          # config.setSeverity(severe_rules[rule], axs.constants.Severity.SEVERE);
        # }
        # config.auditRulesToIgnore = #{excluded_rules.to_json};
        # #{SELECTORS_TO_IGNORE}
        # var results = axs.Audit.run(config);
    # JAVASCRIPT
  # end
# end
