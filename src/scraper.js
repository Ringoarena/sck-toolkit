// configure HTML element targets to scrape, you may need to update cssClasses/elementType to adapt to Facebook changes
const cssClassesSeparatedBySpaces = 'x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz xt0b8zv xzsf02u x1s688f'
const cssClassesSeparatedByDots = cssClassesSeparatedBySpaces.replaceAll(' ', '.')
const elementType = 'a'
const selector = `${elementType}.${cssClassesSeparatedByDots}`

const elements = document.querySelectorAll(selector)
const clubMembers = []
elements.forEach((element) => {
  if (!element.innerHTML.includes('<')) {
    const alreadyAdded = Boolean(clubMembers.find((clubMember) => clubMember.name === element.innerHTML))
    if (!alreadyAdded) {
      const innerHtml = element.innerHTML
      if (innerHtml !== 'Learn More') { // this check is needed in this version because a Learn More link was also targeted with this selector
        const clubMember = { name: element.innerHTML }
        clubMembers.push(clubMember)
      }
    }
  }
})
console.log('members length: ', clubMembers.length)
let jsonData = "data:text/json;charset=utf-8,";
jsonData += JSON.stringify(clubMembers)
const encodedUri = encodeURI(jsonData);
const link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "fbmembers.json");
document.body.appendChild(link);
link.click()
