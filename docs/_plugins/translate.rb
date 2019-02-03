module Jekyll
  module Translate
    def translate(key)
      @context.registers[:site].data['translations'][@context.registers[:page]['collection']][key] || @context.registers[:site].data['translations']['en'][key] || key.to_s.capitalize
    end

    def alter_url(url)
      if @context.registers[:page]['collection'] == 'en'
        url
      else
        "#{url}/#{@context.registers[:page]['collection']}"
      end
    end

    def sanitize_url(url)
      if url[0..@context.registers[:page]['collection'].length+1] == "/#{@context.registers[:page]['collection']}/"
        (url.end_with?('/index') ? url.chomp('/index') : url.chomp('/'))[@context.registers[:page]['collection'].length+1..-1]
      else
        (url.end_with?('/index') ? url.chomp('/index') : url.chomp('/'))
      end
    end
 end
end

Liquid::Template.register_filter(Jekyll::Translate)
