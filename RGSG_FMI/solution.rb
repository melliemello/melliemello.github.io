class Integer 

	def prime?
		return false if self < 2
		divisors = Range.new(2, Math.sqrt(self))
		divisors.each {|divisor| return false if self % divisor == 0}
		true
	end
	
	def prime_factors
		list = []
		2.upto(self).each do |number|
			if self % number == 0 and number.prime? == true				
				list <<[number] + (self/number).prime_factors
				break
			end			
		end
		return list.flatten
	end


	# def harmonic
	# 	harmonic_number = 0/1
	# 	1.upto(self).each {|number| harmonic_number += 1/number.to_r}
	# 	return harmonic_number
	# end

	def harmonic 
		(2..self).reduce(Rational(1)){|sum, number| sum += Rational(1,number)}
	end
	

	def digits
		return  self.abs.to_s.split(//).map{|digit| digit.to_i}
	end
end
 


class Array
	def frequencies
		self.reduce({}) do |frequencies_list, element|
			frequencies_list[element] = self.count(element)
			frequencies_list
		end
	end

	def average
		return self.reduce(:+)/self.length.to_f	
	end
end


