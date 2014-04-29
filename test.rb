#encoding: utf-8

require "erb"




bgContent = {:heading => "Добре дошли",
	     :name => "Милена",
	     :intro => "Това в моята лична страница",
 	     :url => "bg/index.html",
	   

}



enContent = {:heading => "Hello World",
	     :name => "Milena",
	     :intro => "This is my personal page", 
	     :url => "en/index.html",

}


class Content

	def initialize( hash )  # Creates instance variables from any dictionary

		hash.each {|key, val|
			var_name = "@#{key}"  # the '@' is required
    		self.instance_variable_set(var_name, val)
		}
		

		# @url= hash[:url]
		# @name= hash[:name]
		# @intro = hash[:intro]

	end

	attr_accessor :url
	attr_accessor :name
	attr_accessor :intro
  	def get_binding
  		 binding
  	end

	attr_accessor :intro
end



template = File.read('.\test.html.erb')


html = ERB.new(template)
content= Content.new(enContent)


textToRender = html.result(content.get_binding)


File.write("test.html", textToRender )



