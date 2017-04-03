# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path
Rails.application.config.assets.precompile += %w( source.css )
Rails.application.config.assets.precompile += %w( data.js )
Rails.application.config.assets.precompile += %w(graph.js)
Rails.application.config.assets.precompile += %w(main.js)
Rails.application.config.assets.precompile += %w(sidebar.js)
Rails.application.config.assets.precompile += %w(utils.js)
Rails.application.config.assets.precompile += %w(timer.js)
Rails.application.config.assets.precompile += %w(script.js)


# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
