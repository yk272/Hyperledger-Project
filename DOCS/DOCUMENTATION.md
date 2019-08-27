                                                
----------------------------------------------------- FARM FRESH -------------------------------------------------


Note:**Use the Correct Private Key of each Department for transactions because of Implementation of permission** 

**UI  User Guide**
1. Open http://localhost:3000 in the chrome browser.
2. Navigates to the FARM FRESH 'Home page' with "WELCOME" message.
3. Navigate to 'AGENCY'page,Fill all the fields in the forms :
   Sender ID: "Agency"   [permission is set only for Agency]
   Agency PrivateKey: The key you obtained by key generation[ # sawthooth keygen Agency]
   Crate id : crateid should be unique for each product
   Choose Product Type:Select it from drop down
   choose Net weight: select it from drop down
   Date of Packing : Packing date
   Place of Origin : Select the State from where the product is cultivated
   #Add the product[submit the form]
   
4. Navigate to 'CENTRAL 'page,Fill all the fields in the forms :
   Sender ID: "CentralDept"   [permission is set only for CentralDept]
   Agency PrivateKey: The key you obtained by key generation[ # sawthooth keygen CentralDept]
   Crate id : crateid should be unique for each product
   Choose Product Type:Select it from drop down
   choose Net weight: select it from drop down
   Date of arrival : select the arrival date
   Date of dispatch : Select the dispatch date
   Chose Target State : Select the state where the product is alocated to [choose either Kerala.Since we've only set permission for this states only at present] 
   #Add the product[submit the form]

5. Navigate to 'State Inspection Center'page,Fill all the fields in the forms :
   Sender ID: Type Kerala [permission is set only for the state at present]
   Agency PrivateKey:Type the key corresponding to the Sender ID, The key you obtained by key generation[ # sawthooth keygen Kerala]
   Crate id : crateid should be unique for each product
   Choose Product Type:Select it from drop down
   choose Net weight: select it from drop down
   Date of arrival : select the arrival date
   Date of dispatch : Select the dispatch date
   Chose Target Zone : Select the Zone where the product is alocated to [choose either North.Since we've only set permission for this zone] 
   #Add the product[submit the form]

6. Navigate to 'Zonal Inspection Center'page,Fill all the fields in the forms :
   Sender ID: select North[permission is set only for North and South at present]
   Agency PrivateKey: Type the key corresponding to the Sender ID, The key you obtained by key generation[ # sawthooth keygen North  ]
   Crate id : crateid should be unique for each product
   Choose Product Type:Select it from drop down
   choose Net weight: select it from drop down
   Date of arrival : select the arrival date
   Date of dispatch : Select the dispatch date
   Chose Target Retailer : Select the Retailer where the product is alocated to[choose Retailer1,Since we've only set permission for this retailer only at present] 
   #Add the product[submit the form]

7. Navigate to 'RETAILER'page,Fill all the fields in the forms :
   Sender ID: select either North or South zone from the drop down[permission is set only for North and South at present]
   Agency PrivateKey: Type the key corresponding to the Sender ID, The key you obtained by key generation[ # sawthooth keygen North or sawthooth keygen Goa or sawthooth keygen South ]
   Crate id : crateid should be unique for each product
   Choose Product Type:Select it from drop down
   choose Net weight: select it from drop down
#Here you have 2 buttons : View Details and Delete Product
7.1 Click 'View Details' Button :You can view the below mentioned details of the product
    Place of Orgin
    Date of Packing
    Central Arrival Date
    Central Dispatch Date
    State Arrival Date
    State Dispatch Date
    Zonal Arrival Date
    Zonal Dispatch Date

7.2 Click 'Delete Product' Button:
    If product is deleted you will get a alert message "Data Succesfully Deleted" and redirect to Home page
7.3 Select the Retailer id:
    We can view the total stock the retailer has.
    
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**Client side Transaction Flow**

1. Agency ---- When the user enters the data in the "Agency" page the function "agencyAdd()" in main.js file is triggered and the entered data is posted to the "/addAgency" in index.js file, which triggers the "agencyAdd()" function in UserClient.js file in which the data entered is set into a payload and the payload, inputaddresslist, outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createProduct" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches. 

2. Central Inspection Center ---- When the user enters a data in the "Central Inspection Center" page the function "Central()" in main.js file is triggered and the entered data is posted to the "/centralVerify" in index.js file, which triggers the "centralDept()" Function in UserClient.js file in which the data entered is set into a payload and the payload, inputaddresslist, Outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createProduct()" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches. 

3. State Inspection Center ---- When the user enters a data in the "State Inspection Center" page the function "State()" in main.js file is triggered and the entered data is posted to the "/addState" in index.js file, which triggers the "stateDept()" Function in UserClient.js file in which the data entered is set into a payload and the payload, inputaddresslist, Outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createProduct()" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches.

4. Zonal Inspection Center ---- When the user enters a data in the "Zonal Inspection Center" page the function "Zonal()" in main.js file is triggered and the entered data is posted to the "/addZone" in index.js file, which triggers the "zoneDept()" Function in UserClient.js file in which the data entered is set into a payload and the payload, inputaddresslist, Outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createProduct()" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches.

5. Retailer ---- When the user enters a data in the "RETAILER" page have 2 functions "Retrieve()" and "Delete()"."Retrieve()" in main.js file is triggered and the entered data is get to the "/state/:data1/:data2/:data3" in index.js file, which triggers the "getState()" Function in UserClient.js file and query the address .then come back to main.js and list it.
"Delete()" in main.js file is triggered and the entered data is posted to the "/delete" in index.js file, which triggers the "DeletePrt()" Function in UserClient.js file in which the data entered is set into a payload and the payload, inputaddresslist, Outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createProduct()" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches.



 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**Transaction Processor side Transaction Flow**

1. Agency  ---- When the transaction from the client side through rest-api arrives at the Transaction Family "FARM FRESH", and the action is 'Agency Add' then it triggers the function "addAgency()" in the Tp.js file. The address to which the data is to be written is generated using the crateid,product,weight in the payload . After that,triggers the function "writeToStore()" which will produce an event if the payload consist the parameter needed to create the address. The data is written to the state by function 'setState'.



2. Central Inspection Center---- When the transaction from the client side through rest-api arrives at the Transaction Family "FARM FRESH", and the action is 'Central Add' then it triggers the function "addCentral()" in the Tp.js file. The address to which the data is to be written is generated using the crateid,product,weight in the payload . After that, the current state of the generated address is queried and if the state data is empty or null ,returns an InvalidTransaction stating that "Invalid Crate id or Product or weight".else if there is state data the new payload is appended to the existing state data 

3. State Inspection Center---- When the transaction from the client side through rest-api arrives at the Transaction Family "FARM FRESH", and the action is 'State Add' then it triggers the function "addState()" in the Tp.js file. The address to which the data is to be written is generated using the crateid,product,weight in the payload . After that, the current state of the generated address is queried and if the state data is empty or null ,returns an InvalidTransaction stating that "Invalid Crate id or Product or weight".else if there is state data the new payload is appended to the existing state data 

4. Zonal Inspection Center ---- When the transaction from the client side through rest-api arrives at the Transaction Family "FARM FRESH", and the action is 'Zone Add' then it triggers the function "addZone()" in the Tp.js file. The address to which the data is to be written is generated using the crateid,product,weight in the payload . After that, the current state of the generated address is queried and if the state data is empty or null ,returns an InvalidTransaction stating that "Invalid Crate id or Product or weight".else if there is state data the new payload is appended to the existing state data 

5. Retailer  ---- When the transaction from the client side through rest-api arrives at the Transaction Family "FARM FRESH", and the action is 'Delete Product' then it triggers the function "deletePrt()" in the Tp.js file. The address to which the data is to be written is generated using the crateid,product,weight in the payload . Then triggers the function "deleteState()" which will delete the data from the addres

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
6. Event's - In this application, we have only 1 event.

Custom Event:
When a agency registers a product, a custom event triggers.







