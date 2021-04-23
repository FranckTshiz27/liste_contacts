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
let btnDeleteItem;
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

  initItemComponents()
   let eltId = Date.now();
   imgItem.setAttribute('src',item.image);
   pNameItem.innerText=item.prenom +" "+item.nom;
   pBioItem.innerText=item.biographie;
   pGroupeItem.innerText=item.groupe;
   spanItem.innerText = eltId;
   lstView.appendChild(containerItem)
   mesContacts.set(""+eltId,item);
   console.log(mesContacts.size);
   console.log(mesContacts.delete(eltId));
   console.log(mesContacts.get(eltId));
   console.log(mesContacts);
}

function initItemComponents()
{

     // initialisation des controles de l'item du contact
     spanItem = document.createElement("span");
     spanItem.setAttribute("id","spId")
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
     iDelete =document.createElement("i");
     iDelete.addEventListener('click',deleteItem);
     pNameItem.setAttribute("id","pNameItem");
     divActionItem.setAttribute("id","divContainer2");
     containerItem.setAttribute("id","divContainer0");
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
    divActionItem.appendChild(iDelete);
    divActionItem.appendChild(spanItem);
    

    containerItem.classList.add("containerItem");  
    containerTextItem.classList.add("containerTextItem");
    pBioItem.classList.add("pBio")
    imgItem.classList.add("imgItem");
    pGroupeItem.classList.add("pBio");
    divActionItem.classList.add("divAction");
    iDelete.classList.add("fas","fa-trash-alt","spId");
   
}


 function deleteItem(event)
{
    event.preventDefault();
    let item = event.target.parentNode.parentNode;
    console.log(event.target.parentNode.children);
    let eltId = (""+event.target.parentNode.children["spId"].firstChild.data).trim();
    lstView.removeChild(item);
    mesContacts.delete(eltId);
    console.log(mesContacts)
   
} 

function getItemId(event)
{
    let item =  event.target.parentNode.parentNode; 
}



