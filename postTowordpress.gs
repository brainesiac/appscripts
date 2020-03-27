

function postToWordPress() {

  /* Add your WordPress credentials and replace example.com with your WordPress blog URL */
  var wordpress = {
    url: "https://marketing-hercules.investorsobserver.com",
    username: "mmaynard@freshbrewedmedia.com",
    password: "6tmmBffKbuMkxtYOvea5K"
  };

  /* Make sure your WordPress XML-RPC URL is correct */
  var checkConfig = UrlFetchApp.fetch(wordpress.url, {muteHttpExceptions: true});

  if (checkConfig.getResponseCode() !== 200) {

    throw new Error("Please check your XML RPC URL");

  }

  /* Call the metaWeblog.newPost API method to create a new blog post */
  var request = new XMLRPC.XmlRpcRequest(wordpress.url, 'metaWeblog.newPost');

  /* The first parameter is empty since there's no blog ID for WordPress */
  request.addParam("");

  request.addParam(wordpress.username);
  request.addParam(wordpress.password);

  /* The blog post content. You can have HTML in the description */
  var blogPost = {
    post_type: 'post',
    post_status: 'draft',  /* Set to draft or publish */
    title: 'TEST POST',
    description: 'This post is a test'
  };
logger.log(blogPost)
  request.addParam(blogPost);

  var response = request.send().parseXML();

  Logger.log(response);

}
