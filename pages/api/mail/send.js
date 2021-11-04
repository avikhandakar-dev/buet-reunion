const SibApiV3Sdk = require("sib-api-v3-sdk");

export default async (req, res) => {
  if (req.method === "GET") {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = "AtxsE7C9BrfyQVgR";
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "My Subject";
    sendSmtpEmail.htmlContent =
      "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = {
      name: "Buetian 89 NA",
      email: "buetian89@gmail.com",
    };
    sendSmtpEmail.to = [{ email: "avikhandakar@gmail.com", name: "Jane Doe" }];
    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
        return res.status(200).json({
          statusCode: 200,
          message: "Send mail successfully!",
        });
      },
      function (error) {
        console.error(error);
        return res.status(500).json({
          statusCode: 500,
          message: error.message,
        });
      }
    );
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
