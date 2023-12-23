

var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var tableBody =document.getElementById("tbody");

if (localStorage.getItem('mySite') !=null) {
    siteContainer = JSON.parse(localStorage.getItem('mySite'))
    displaySite(siteContainer)

}else
{
    siteContainer=[];
}

function addSite() {
  if (validateSite(bookmarkName.value)&& validateUrl(bookmarkURL.value)) {
    var site = {
        nameSite : bookmarkName.value ,
        namaUrl : bookmarkURL.value
       }
       siteContainer.push(site);
       console.log(siteContainer);
       localStorage.setItem('mySite', JSON.stringify(siteContainer))
       clearForm();
       displaySite(siteContainer);
  }
  else{
    alert('Website Name OR URL is invalid')
  }
}

function clearForm() {
    bookmarkName.value="";
    bookmarkURL.value="";
}

function displaySite(arr) {
    
    var cartoona = `` ; 
    for(var i=0 ; i<arr.length ; i++) 
    {
        var siteIndex = i +1 ;
        cartoona += `       <tr>
        <td>${siteIndex}</td>
        <td>${arr[i].nameSite}</td>
        <td><a href="${arr[i].namaUrl}" target="_blank" type="button" class="btn btn-success" id="btnVisit"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-delete"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>                            
        </tr>`
  
    }
    tableBody.innerHTML=cartoona;
}

function searchProducts(searchTerm) {
    var searchResult=[];
  for(var i = 0 ; i< siteContainer.length ; i++)
  {
    if (siteContainer[i] .nameSite.toLowerCase().includes(searchTerm.toLowerCase())) {
      searchResult.push(siteContainer[i])
    }
  }
  console.log(searchResult);
  displaySite(searchResult)
  }
  

function deleteSite(deleteIndex) {
    siteContainer.splice(deleteIndex , 1)
    localStorage.setItem('mySite', JSON.stringify(siteContainer))
    displaySite(siteContainer)
}


function validateSite(name) {
    var nameRegex = /^\w{3,}(\s+\w+)*$/ ;
    if (nameRegex.test(name)) {
        bookmarkName.classList.replace( 'is-invalid', 'is-valid')
        return true
    }
    else {
        bookmarkName.classList.add('is-invalid')
        return false
    }
}

function validateUrl(name) {
    var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    if (urlRegex.test(name)) {
        bookmarkURL.classList.replace( 'is-invalid', 'is-valid')
        return true
    }
    else {
        bookmarkURL.classList.add('is-invalid')
        return false
    }
}
