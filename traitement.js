let ipPrenom = null;
let ipNom = null;
let stGroupe = null;
let taBio= null;
let btnCapture = null;
let btnSave = null;
let btnCancel = null;
let imgPhoto =null;
let monImage  = null;
let imgShow  = null;
let ipFile = null;
let lstView = null;
let mesContacts = new Map();

// Les controles du contact

let containerItem;
let containerImgItem;
let imgItem ;
let containerTextItem;
let pNameItem;
let pBioItem;
let pGroupeItem ;
let divActionItem;
let btnEditItem;
let btnDeleteItem;
let iEdit;
let iDelete;
let spanItem;


initComponents();
setEvents();




function initComponents()
{
    ipNom = document.getElementById("nom");
    ipPrenom = document.getElementById("prenom");
    stGroupe = document.getElementById("groupe")
    taBio = document.getElementById("bio");
    btnCancel = document.getElementById("btnCancel");
    btnCapture=document.getElementById("btnCapture");
    btnSave = document.getElementById("btnSave");
    ipFile = document.getElementById("myFile");
    imgShow = document.getElementById("imgShow");
    lstView = document.querySelector(".lst");

   

}

function setEvents()
{
    
    if(ipFile!=null)
    {

        
        ipFile.addEventListener('change',function setImage(e)
        {
            
            e.preventDefault();
            
            let myfiles = ipFile.files;
            
            if(myfiles!=null&&myfiles[0]!=null)
            {
                imgShow.src = URL.createObjectURL(myfiles[0]);
            }
        }
        
        );  
    }


    if(checkComponents())
    {

        btnSave.addEventListener('click',function save(e)
        {
            e.preventDefault();
            let prenom = ipPrenom.value;
            let nom = ipNom.value;
            let bio = taBio.value;
            let groupe = stGroupe.value;
            let imgSrc = imgShow.src;
            let contactId = Date.now();
        
            if(validateData(prenom,nom,bio,groupe))
            {
                
                let contact = {};
                contact.prenom= prenom.toUpperCase();
                contact.nom= nom.toUpperCase();
                contact.biographie = bio;
                contact.groupe = groupe.toUpperCase();
                contact.image = imgSrc;
                contact.id=contactId;
                mesContacts.set(contactId,contact);

                setItem(contact);

            }

            else
            {
                alert("Veuillez remplir tous les champs!");
            }
        
        }
        );   
    }
    btnCancel.addEventListener('click',function reset(e)
    {
        e.preventDefault();
        ipPrenom.value="";
        ipNom.value="";
        taBio.value="";
    });
}


function checkComponents()
{
    return  ipPrenom!=null&&ipNom!=null&&taBio!=null&&stGroupe!=null&&btnSave!=null?true:false; 
}

function validateData(prenom,nom,groupe,bio)
{
    return prenom!=""&&nom!=""&&groupe!=""&&bio!=""? true:false;
}

function setItem(item)
{

   initItemComponents();
   imgItem.setAttribute('src',item.image);
   pNameItem.innerText=item.prenom +" "+item.nom;
   pBioItem.innerText=item.biographie;
   pGroupeItem.innerText=item.groupe;
   spanItem.innerText = item.id;
   lstView.appendChild(containerItem)
}

function initItemComponents()
{

     // initialisation des controles de l'item du contact
     spanItem = document.createElement("span");
     containerItem = document.createElement("div");
     containerImgItem = document.createElement("div");
     imgItem = document.createElement("img");
     imgItem.setAttribute("id","imgItem")
     containerTextItem = document.createElement("div")
     pNameItem = document.createElement("p");
     pNameItem.setAttribute('id',"nom")
     pBioItem = document.createElement("p");
     pGroupeItem = document.createElement("p");
     divActionItem  = document.createElement("div");
     btnEditItem  = document.createElement("button");
     btnDeleteItem  = document.createElement("button");
     iEdit = document.createElement("i");
     iDelete =document.createElement("i");
     iDelete.addEventListener('click',deleteItem);
     iEdit.addEventListener('click',editItem);

     pNameItem.setAttribute("id","pNameItem");
     divActionItem.setAttribute("id","diconatainer2");
     containerItem.setAttribute("id","diconatainer0");
     containerTextItem.setAttribute("id","containerTextItem");
     pGroupeItem.setAttribute("id","pGroupeItem");
     pBioItem.setAttribute("id","pBioItem");
    
    
     organizeElements();
}

function organizeElements()
{
    
    containerItem.appendChild(imgItem);
    containerItem.appendChild(containerTextItem);
    containerItem.appendChild(divActionItem);
    containerTextItem.appendChild(pNameItem);
    
    
    containerTextItem.appendChild(pGroupeItem);
    containerTextItem.appendChild(pBioItem);
    divActionItem.appendChild(btnEditItem);
    divActionItem.appendChild(btnDeleteItem);
    divActionItem.appendChild(spanItem);
    btnDeleteItem.appendChild(iDelete);
    btnEditItem.appendChild(iEdit);

    containerItem.classList.add("containerItem");  
    containerTextItem.classList.add("containerTextItem");
    pBioItem.classList.add("pBio")
    imgItem.classList.add("imgItem");
    pGroupeItem.classList.add("pBio");
    divActionItem.classList.add("divAction");
    iEdit.classList.add("fas","fa-edit");
    iDelete.classList.add("fas","fa-trash-alt");
    

}


 function deleteItem(event)
{
    event.preventDefault();
    
    let item =  event.target.parentNode.parentNode.parentNode;
    lstView.removeChild(item);
    alert(item)
} 
function getItemId(event)
{
    let item =  event.target.parentNode.parentNode;
    
}
function editItem(event)
{
    event.preventDefault();
    let item =event.target.parentNode.parentNode.parentNode;
    item = item.children;
     for(let elt of item)
     {
        motif = elt.getAttribute("id");
        setData(elt)
     }
     
     

}

function setData(elt)
{
  
  if(elt!=null)
  {
      let motif = elt.getAttribute("id");
      switch(motif)
      {
          case"imgItem":
           imgShow.setAttribute("src",elt.getAttribute("src"))
          break;
          case"containerTextItem":
            let elements = elt.children;

            for(let elt of elements)
            {   
                if(elt!=null)
                {
                    switch (elt.getAttribute("id")) {
                        case "pNameItem":
                            let noms = (elt.innerText).split(" ")
                            ipPrenom.value=noms[0];
                            if(noms.length==3)
                            {
                                ipNom.value= noms[1] +" "+ noms[2];
                            }
                            else
                            {
                                ipNom.value= noms[1];
                            }
                            
                        break;

                        case "pGroupeItem":   
                            stGroupe.value=elt.innerText; 
                        break;

                        case "pBioItem":  
                        alert(pBioItem.innerText);
                         taBio.value=elt.innerText; 
                        break;
                        
                    
                       
                    }
                    
                }
                
            }

          break;

          

      }
      lstView.removeChild(elt.parentNode);
  }
}