module Jekyll
  class Document
    def url_template
      if (":path/" == collection.url_template[-6..-1] || collection.url_template) && (basename.split(".").first == "index")
        collection.url_template.chomp("/")
      else
        collection.url_template
      end
    end
  end
end
