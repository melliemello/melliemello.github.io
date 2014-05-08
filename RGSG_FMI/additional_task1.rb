

def zig_zag(number)
	matrix = []
	(1..number*number).each_slice(number).with_index do |sequence, i|
		sequence = sequence.reverse if i.odd? == true
		matrix << sequence
	end
	matrix
end




