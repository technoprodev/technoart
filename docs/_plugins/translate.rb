module Jekyll
  module Translate
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
