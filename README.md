# Hotwire Spark

**Hotwire Spark** is a live-reloading system for Hotwire applications. It enhances your development feedback loop by detecting source code changes and updating the page *smoothly* without requiring a manual reload.

## Installation

Add the gem to the group `development`:

```ruby
group :development do
  gem "hotwire_spark"
end
```

And then execute:

```bash
$ bundle
```

That's it!

## Hot it works

The system will listen for three kinds of changes and will take action depending on each:

* **HTML change:** it fetches the new document body and updates the current body with morphing. It uses [`idiomorph`](https://github.com/bigskysoftware/idiomorph) under the hood.
* **CSS change:** it fetches and reload the stylesheet that changed.
* **Stimulus controller change:** it fetches the Stimulus controller that changed and reload all the controllers in the page.

## Configuration

You can set configuration options on your `development.rb`. For example:

```ruby
config.hotwire.spark.html_paths += %w[ lib ]
```

| Name             | Description                                                                                                                  |
|------------------|------------------------------------------------------------------------------------------------------------------------------|
| `enabled`        | Enable or disable live reloading. By default, it's only enabled in `development`.                                            |
| `html_paths`     | Paths where file changes trigger a content refresh. By default: `app/controllers`, `app/helpers`, `app/models`, `app/views`. |
| `css_paths`      | Paths where file changes trigger a CSS refresh. By default: `app/assets/stylesheets`.                                        |
| `stimulus_paths` | Paths where file changes trigger a Stimulus controller refresh. By default: `app/javascript/controllers`.                    |

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
