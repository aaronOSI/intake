FROM casecommons/ca_intake_base_image:latest

ENV APP_HOME /ca_intake
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ENV BUNDLE_PATH /ca_intake/ruby_gems

RUN mkdir /build_artefacts
COPY scripts/build.sh /usr/local/bin/build.sh
RUN chmod +x /usr/local/bin/build.sh

COPY . ./
RUN bundle install -j24
RUN npm install --spin=false
