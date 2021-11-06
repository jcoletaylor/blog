---
date: 2021-10-30
title: "Tasker Engine"
cover: "images/flowchart.png"
categories: 
    - Code
slug: "tasker-engine"
tags:
    - ruby-on-rails
    - rails-engines
    - open-source
---

## Tasker - Now as a Rails Engine

[Tasker](https://github.com/jcoletaylor/tasker) is now a Rails Engine! Like we talked about in [the other article](/tasker), I originally developed Tasker as a [standalone application](https://github.com/jcoletaylor/tasker_rails), but it felt like this would be a really good opportunity to convert it to a Rails Engine. For my day-to-day professional life I've been working pretty deeply with microservices and domain driven design patterns, but my current role has me back in a Rails monolith - in some ways, it feels good to be home! However, if we were ever going to use something like this in my current role, we would want it to be an Engine so it could be built and maintained external to our existing architecture.

For this Rails Engine, I'm not going to include a lot of the sample lower-level handlers that the standalone application has written in Rust. However, you can [checkout the writeup](https://github.com/jcoletaylor/tasker_rails#technology-choices) in that app if you're interested!

## Using the Engine (It's just a Gem!)

Using Rails Engines is pretty easy - they're just Gem's! That makes it pretty easy to get started.

Add to your Rails `Gemfile`

```ruby
# add to your Gemfile
source 'https://rubygems.pkg.github.com/jcoletaylor' do
  gem 'tasker', '~> 0.2.2'
end
```

Add the migrations in your Rails app root:

```bash
bundle install
bundle exec rake tasker:install:migrations
bundle exec rake db:migrate
```

And then mount it where you'd like in `config/routes.rb` with:

```ruby
# config/routes.rb

Rails.application.routes.draw do
  mount Tasker::Engine, at: '/tasker', as: 'tasker'
end
```

Only thing to bear in mind is that Tasker is currently very much limited to using `Postgres` and `Redis` - at the moment I don't think it's extremely likely I would try to go beyond that, unless there was a serious request or need.

## How to use Tasker

Of course first you'll have to add it to your Gemfile and install it, as above.

Building a TaskHandler looks something like this:

```ruby
class DummyTask
  include Tasker::TaskHandler

  # these are just for readability, they could just be strings elsewhere
  DUMMY_SYSTEM = 'dummy-system'
  STEP_ONE = 'step-one'
  STEP_TWO = 'step-two'
  STEP_THREE = 'step-three'
  STEP_FOUR = 'step-four'
  STEP_FIVE = 'step-five'
  TASK_REGISTRY_NAME = 'dummy_task'

  # this is for convenience to read, it could be any class that has a handle method with this signature
  class Handler
    # the handle method is only expected to catch around recoverable errors
    # it is responsible for setting results back on the step
    def handle(_task, _sequence, step)
      # task and sequence are passed in case the task context or the sequence's prior steps
      # may contain data that is necessary for the handling of this step
      step.results = { dummy: true }
    end
  end

  # register the task handler with the handler factory
  register_handler(TASK_REGISTRY_NAME)

  # define steps for the step handlers
  # only name and handler_class are required, but others help with visibility and findability
  define_step_templates do |templates|
    templates.define(
      dependent_system: DUMMY_SYSTEM,
      name: STEP_ONE,
      description: 'Independent Step One',
      # these are the defaults, omitted elsewhere for brevity
      default_retryable: true,
      default_retry_limit: 3,
      skippable: false,
      handler_class: DummyTask::Handler
    )
    templates.define(
      dependent_system: DUMMY_SYSTEM,
      name: STEP_TWO,
      description: 'Independent Step Two',
      handler_class: DummyTask::Handler
    )
    templates.define(
      dependent_system: DUMMY_SYSTEM,
      name: STEP_THREE,
      depends_on_step: STEP_TWO,
      description: 'Step Three Dependent on Step Two',
      handler_class: DummyTask::Handler
    )
    templates.define(
      dependent_system: DUMMY_SYSTEM,
      name: STEP_FOUR,
      depends_on_step: STEP_THREE,
      description: 'Step Four Dependent on Step Three',
      handler_class: DummyTask::Handler
    )
  end

  # this should conform to the json-schema gem's expectations for how to validate json
  # used to validate the context of a given TaskRequest whether from the API or otherwise
  def schema
    @schema ||= { type: :object, required: [:dummy], properties: { dummy: { type: 'boolean' } } }
  end
end

```

## TODO

* Build more real-world examples of `Tasker::TaskHandler` implementations