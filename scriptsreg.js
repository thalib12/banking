

class Bank {
    createAccount() {
        let acno = accno.value
        let firstn = fname.value
        let lastn = lname.value
        let pass1 = pwd1.value
        let pass2 = pwd2.value
        let baln = bal.value
        if (acno in localStorage) {
            alert("Account already exist")
        }
        else {
            if (pass1 == pass2) {
                console.log(firstn, lastn, pass1, pass2);
                let det = { account_number: acno, first_name: firstn, last_name: lastn, password: pass1, balance: baln,transaction:[]}


                localStorage.setItem(det.account_number, JSON.stringify(det))
                location.href = "./loginpage.html"
            }
            else {
                swal("password must be same")
            }
        }
    }
    validateAccount(accno) {
        return accno in localStorage ? true : false
    }
    authenticate() {
        let acno = log_accno.value
        let pwd = log_pass.value
        let data = JSON.parse(localStorage.getItem(acno))
        if (this.validateAccount(acno)) {

            if (pwd == data.password) {
                sessionStorage.setItem("user", acno)
                alert("Login Successfully");
                document.querySelector("#alert").innerHTML=""
                    location.href = "./homepage.html"
                




            }
            else {
                document.querySelector("#alert").innerHTML="Incorrect Password!"
            }
        }
        else {

            document.querySelector("#alert").innerHTML="Invalid Account Number!"
        }

    }

    logout() {
        alert("Logout success")
        sessionStorage.clear()

        location.href = "./loginpage.html"




    }
    balanceEnquiry() {
        let account = sessionStorage.getItem("user")
        let balance = JSON.parse(localStorage.getItem(account))


        return balance["balance"]

    }
    getBalance() {

        document.querySelector("#result").innerHTML = `<p>YOUR AVAILABLE BALANCE: ${this.balanceEnquiry()}Rs </p>`
        document.querySelector("#tab").innerHTML=''
    }
    // getAccount(acc){
    //     return JSON.parse(localStorage.getItem(acc))

    // }
    fundTransfer() {
        let accno1 = acc1.value
        let accno2 = acc2.value
       
        let amount = parseInt(amt.value)
    
        let bal = parseInt(this.balanceEnquiry())
        if (accno1 == accno2) {
            if (this.validateAccount(accno1)) {


                if (amount < bal) {
                    let fromacc = sessionStorage.getItem("user")
                    let fromnewbal = JSON.parse(localStorage.getItem(fromacc))
                    fromnewbal["balance"] = parseInt(fromnewbal.balance) - amount
                    localStorage.setItem(fromacc, JSON.stringify(fromnewbal))
                    
                    let newbal = JSON.parse(localStorage.getItem(accno1))
                    newbal["balance"] = parseInt(newbal.balance) + amount
                    localStorage.setItem(accno1, JSON.stringify(newbal))
                    
                    fromnewbal["transaction"].push({"To":accno1,"Amount":amount})
                    localStorage.setItem(fromacc, JSON.stringify(fromnewbal))
                    
                    newbal["transaction"].push({"From":fromacc,"Amount":amount})
                    localStorage.setItem(accno1, JSON.stringify(newbal))
                    
                
                    localStorage.setItem(fromacc, JSON.stringify(fromnewbal))
                    localStorage.setItem(accno1,JSON.stringify(newbal))
                    
                    
                    
                    alert("Transaction successful")
                  
                    document.querySelector("#model").innerHTML=""
                }
                else {
                    document.querySelector("#model").innerHTML="Insufficient Balance"
                }

            }
            else {
                document.querySelector("#model").innerHTML="Invalid Account Number"
            }
        }
        else {
            document.querySelector("#model").innerHTML="Account Number Mismatch"
        }
    }
    paymentHistory() {

        let trans=JSON.parse(localStorage.getItem(sessionStorage.getItem("user"))).transaction
        let html_data=`<tr><td style="color:white;font-weight:bold;padding:12px">Transaction</td> <td style="color:white;font-weight:bold;">Account Number</td></tr>`
        let t=[]
        for(let data of trans){
            if(!data["From"]){
                html_data+=`<tr><td style="color:red;font-weight:bold;">-${data.Amount} Rs</td> <td style="color:white;font-weight:bold;">${data.To}</td></tr>`
            }
            else{
                html_data+=`<tr><td style="color: rgb(13, 235, 5);font-weight:bold;">+${data.Amount} Rs</td> <td style="color:white;font-weight:bold;">${data.From}</td></tr>`
            } 
            
            
            }
            
            document.querySelector("#tab").innerHTML=html_data
            document.querySelector("#result").innerHTML=''
            
        }
    

    
    



}
var bank = new Bank()
bank.validateAccount(this.accno)
bank.balanceEnquiry()

// authenticate login
// navbar homepage