Observations = new Mongo.Collection("observation");

if (Meteor.isClient) {
    
   Meteor.subscribe("observation");  // every client created will subscribe to the same database
  
  Template.observe.helpers( {
    "observation" : function () {
      return  Observations.find(
                  {},
                  {sort: {createdOn: -1}} )  || {};  // this will query the database and find everything
      // returns all message objects, or an empty object if no DB
    }
    } );
  
  
  Template.observe.events(  
      {   
        "submit form": function (event){  
          event.preventDefault();
          
          // alert("submit event");
          
          // this uses jQuery to find named fields in the HTML form
          var hiveBox = $(event.target).find('input[name=hiveName]');
          var hiveText = hiveBox.val();
          
          var observeDate = $(event.target).find('input[name=observationDate]')
          var observeDateText = observeDate.val();
          
          var durationBox = $(event.target).find('input[name=duration]');
          var durationText = durationBox.val();
          
          var miteCountBox = $(event.target).find('input[name=miteCount]');
          var miteCountText = miteCountBox.val();
          
          
         // if (hiveText.length > 0 &&
          //    observeDateText > 0 &&
          //    durationText.length > 0 &&
          //    miteCountText > 0 ) {
          
            Observations.insert(
                {
                  hiveName: hiveText,
                  observationDate: observeDateText, 
                  duration: durationText,
                  miteCount: miteCountText,
                  createdOn: Date.now()
                }
            );
            
            hiveBox.val("");
            observeDate.val("");
            durationBox.val("");
            miteCountBox.val("");
          //}
         // else{
       //      alert ("Hive Name, observation date, duration and mite count are all required.");
          //  console.log(hiveBox);
          //  hiveBox.classList.add("has-warning"); //style.backgroundColor = "red";
        //  }
          
          
         
       //   alert("Name is " + nameText + ", msg is " + messageText);
        }
      }
  );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
