function sendEmail(){
    
  var request = new XMLHttpRequest();
  var mails = document.getElementById("emails").value;
  var message = document.getElementById("message").value;
  var night_id = JSON.parse(localStorage.id_created_night);

  if(mails==""){
    alert("Please insert at least one email!");
    return;
  }
  
  var obj = {recipients : mails , message :  message , id : night_id};
  var data = JSON.stringify(obj); 

  
  
  request.open('POST', 'https://pacific-stream-14038.herokuapp.com/mail' , true)
  request.onload = function() {
  
  if (request.status >= 200 && request.status < 400) {
      //var risposta = JSON.parse(this.response);
      alert("We have successfully sent the mail to your friends!");
      
        window.location.href = "FinalStep.html";
       
       } 
  else {
      
      alert("Something went wrong! Please try again");
      } 
}
request.setRequestHeader("Content-type", "application/json");
request.send(data);
 

}