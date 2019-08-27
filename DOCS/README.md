------------------------------------------------------------------------ FARM FRESH [FF] --------------------------------------------------------------------



**Description:**

FARM FRESH is an application on private Sawtooth network that creates a distributed ledger with a decentralized platform for making the distribution of fruits without any adultering. 

FARM FRESH app connects Agency(one who collects goods from the farmer),Central Inspection Center,State ,Zonal Inspection Centers and retailers.It enables us to supervise the timeline based flow of fruits,improve transparency and prevents fraud and establish trust.Each Central,State and Zonal Inspection Centers will have dedicated Inspectors who will verify the authenticity and make sure that the quality is assured till it reaches the retailer.

FARM FRESH is an application which brings all departments which participates in the distribution and verification.This application helps to track the product transparently and trace Adulteration,Quality.Majorly the application will be to have the tracebility.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**System requirements:**

1. Operating system: Ubuntu 16.04
2. System RAM: 4 GB or above (recommended 8 GB)
3. Free System storage: 4 GB on /home


**Installation prerequisites:**

1. Docker must be installed in the system
2. Docker Compose must be installed


3. Ensure that NodeJS (version 8.15 ideally) is installed in the system. [For more information about NodeJS, go to https://nodejs.org]. 
   To check if installed, open a the terminal window and give the command
   ## node -v

4. If NodeJS is not installed, go to https://nodejs.org and download the compatible version (version 8.15) based on system OS, or go to the terminal window: and give the command
   # sudo apt-get install -y nodejs

5. Ensure that Docker is installed. [Docker is a platform for developers and system administrators to develop, ship, and run applications. For more information, go to https://www.docker.com].
   To check if installed, go to the terminal window: give the command
   # sudo docker --version

6. If Docker is not installed, go to the terminal window:
   SET UP THE REPOSITORY

   1.Update the apt package index:
   # sudo apt-get update
   2.Install packages to allow apt to use a repository over HTTPS:
   # sudo apt-get install \apt-transport-https \ca-certificates \curl \ gnupg-agent \software-properties-common
   3.Add Docker’s official GPG key:
   # curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   4.Use the following command to set up the stable repository.
   # sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu \(lsb_release -cs) \stable"
   
   INSTALL DOCKER CE

   1.Update the apt package index.
   # sudo apt-get update
   2.Install the latest version of Docker CE.
   # sudo apt-get install docker-ce
   3.Verify that Docker CE is installed correctly by running the hello-world image.
   # sudo docker run hello-world
   This command downloads a test image and runs it in a container. When the container runs, it prints an informational message and exits.

7. Ensure that Docker Compose is installed. Compose is a tool for defining and running multi-container Docker applications. To check if installed, go to the terminal window:
   # sudo docker-compose --version

8. If Docker Compose is not installed, go to the terminal window:
   # sudo apt-get update
   # sudo apt-get install docker-compose


**Instructions for Installation of Application:**

1. Download the folder "FARM FRESH"
2. Open a terminal inside the folder "FF" and give the command :
    # sudo docker-compose up
3. After running all the containers  
4. Open another terminal from the same folder "FARM FRESH" and give the command :
    #sudo docker exec -it validator bash
    [This will open the validator bash and we have to set the permissions in this validator bash by giving the commands below]

**How to set Permissions**

Key Generation
-------------------------------------------------------
 # sawtooth keygen Agency
 # sawtooth keygen CentralDept
 # sawtooth keygen Kerala
 # sawtooth keygen North
 # sawtooth keygen Retailer1


5. # sawset proposal create --key  ~/.sawtooth/keys/my_key.priv  sawtooth.identity.allowed_keys=$(cat ~/.sawtooth/keys/my_key.pub) --url http://rest-api:8008

6. # sawtooth identity policy create --key /root/.sawtooth/keys/my_key.priv policy_1 "PERMIT_KEY $(cat /root/.sawtooth/keys/my_key.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/Agency.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/CentralDept.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/Kerala.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/North.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/Retailer1.pub)"--url http://rest-api:800​8 

7. Now set the role as transaction signer for Family name "ff" for the keys under the policy file name policy_1

  # sawtooth identity role create --key ~/.sawtooth/keys/my_key.priv transactor.transaction_signer.ff policy_1 --url http://rest-api:8008 

8. Now give the below commands to view the keys of each department. Using these private keys we can access the UI



Simply copy-paste the entire code below to get keys.
------------------------------------------------------
 # cat ~/.sawtooth/keys/Agency.priv
 # cat ~/.sawtooth/keys/CentralDept.priv
 # cat ~/.sawtooth/keys/Kerala.priv
 # cat ~/.sawtooth/keys/North.priv
 # cat ~/.sawtooth/keys/Retailer1.priv
-----------------------------------------------------

9. Now go to the chrome browser and go to http://localhost:3000
10. Now you can access the application using the corresponding departments private key
11. You can verify the state by ://localhost:8008/state
12. To terminate the app execution, go to the terminal window (where docker-compose is running) and give CTRL+C
13. Wait for docker-compose to gracefully shutdown. Then: give the command
    # sudo docker-compose down







