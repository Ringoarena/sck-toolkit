const elements = document.querySelectorAll('div.bdao358l.om3e55n1.g4tp4svg.alzwoclg.cqf1kptm.jez8cy9q.gvxzyvdx.i0rxk2l3.laatuukc.gjezrb0y.abh4ulrg a.qi72231t[tabindex="0"][role="link"][href*="/groups"]')

const members = []
elements.forEach((element) => {
  if (!element.innerHTML.includes('<')) {
    const alreadyAdded = Boolean(members.find((m) => m.name === element.innerHTML))
    if (!alreadyAdded) {
      members.push({ name: element.innerHTML })
    }
  }
})
console.log('members length: ', members.length)

let csvContent = "data:text/json;charset=utf-8,";
csvContent += JSON.stringify(members)
const encodedUri = encodeURI(csvContent);
const link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "fbmembers.json");
document.body.appendChild(link);
link.click()
