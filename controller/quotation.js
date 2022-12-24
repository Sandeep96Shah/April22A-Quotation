const Quotation = require("../model/quotation");
const User = require("../model/user");

module.exports.createQuotation = async (req, res) => {
  try {
    const { content, userId } = req.body;
    const newQuotation = await Quotation.create({
      content: content,
      user: userId,
    });

    // fetch user from db based on userId
    const user = await User.findById(userId);

    //if existingUser does not exist then return with 400 status code
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        data: {},
      });
    }

    user.quotaions.push(newQuotation._id);
    await user.save();

    return res.status(200).json({
      message: "Quotation created successfully!",
      data: {
        quotation: newQuotation,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Opps error while creating the quotation!",
      data: {error: error},
    });
  }
};

module.exports.getAllQuotations = async (req, res) => {
  try{
    // fetch the entire quotations data from Quotation model
    // populate the user field by selecting only the name field
    const quotations = await Quotation.find({}).populate({
      path: 'user',
      select: 'name',
    });

    return res.status(200).json({
      message: "Successfully fetched all quotations form db!",
      data: {
        quotations: quotations,
      }
    })
  }catch(error){
    return res.status(500).json({
      message: "Error while fetching the quotations details from db!",
      data: {
        error: error,
      }
    })
  }
}
