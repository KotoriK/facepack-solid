import {processTemplate} from '../src/util/template'
test('template:skip blank',()=>{
    expect(processTemplate(":",":",(str)=>'😀',':123:: :')).toBe('😀: :')
    expect(processTemplate("{","}",(str)=>'😀','{123}{ }{\r} ')).toBe('😀{ }{\r} ')


})