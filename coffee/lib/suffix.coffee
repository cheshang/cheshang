window.suffix_any_case  = (s) ->

    result = [] 
    
    for suffix in s.split(' ')
        tmp = [""]
        for i in suffix
            t = []
            r = [
                i.toUpperCase(), i.toLowerCase()        
            ]

            if r[0] == r[1]
                r = r[0]

            for j in r
                for m in tmp 
                    t.push m+j

            tmp = t

        for i in tmp
            result.push "*.#{i}"

    result.join ';'


