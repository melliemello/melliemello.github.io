#encoding: utf-8

require "erb"

content = {:bulgarian => {:heading => "Добре дошли",
						  :name => "Милена",
						  :intro => "Това в моята лична страница",
						  :url => "bg/index.html",  
						},

	       :english => {:heading => "Hello World",
				   	    :name => "Milena",
					    :intro => "This is my personal page", 
					    :url => "en/index.html",
						}
		}

class Content
	def initialize(hash)  # Creates instance variables from any dictionary
		hash.each {|key, val|
			var_name = "@#{key}"  
    		instance_variable_set(var_name, val)
    		# self.class.__send__(:attr_writer, "#{key}")
		}
	end

  	def get_binding
  		 binding
  	end

end


class Template
	attr_reader :html

	def initialize(path)
		@html = ERB.new(File.read(path))
	end

	def render(content, language)
		textToRender =self.html.result(content.get_binding) 
		File.write("#{language}/test.html", textToRender) 
	end
		
end


content.each do |key, val|
	content = Content.new(val)
	template = Template.new("templates/test.html.erb")
	template.render(content, key)
end






