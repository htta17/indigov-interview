const constituentsService = require("./../service/constituentsService"); 

exports.getAllConstituents = async (req, res, next) => {
    try {
        const constituents = await constituentsService.getAllConstituents();
        
        res.json(constituents);  // Send the result as JSON
      } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching users', 
            error: error.message 
        });
      }
}

exports.getConstituents = async (req, res, next) => {
    try {
        const params = req.params; 
        console.log(params);
        
        const constituents = await constituentsService.getAllConstituents();
        
        res.json(constituents);  // Send the result as JSON
      } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching users', 
            error: error.message 
        });
      }
}

exports.createConstituent = async (req, res) => {
    try {
      const constituentData = req.body;  // Get data from request body

      // Check if constituent is exist      
      const existEmails = await constituentsService.getConstituentByEmail(constituentData.email);

      if (existEmails.length === 0) {        
        await constituentsService.createConstituent(constituentData);
        res.status(201).json({ message: 'Constituent created successfully' });
      }
      else {        
        res.status(400).json({ message: `Constituent with email ${constituentData.email} is exist` });
      }      
      
    } catch (error) {
      res.status(500).json({ message: 'Error creating constituent', error: error.message });
    }
};


exports.updateConstituent = async (req, res) => {
    try {
        const constituentData = req.body;  // Get data from request body

        // Check if constituent is exist      
        const existEmails = await constituentsService.getConstituentByEmail(constituentData.email);

        if (existEmails.length === 0) {        
            res.status(404).json({ message: `Constituent with email ${constituentData.email} is not exist` });
        }
        else {        
            await constituentsService.updateConstituent(constituentData);
            res.status(201).json({ message: 'Constituent created successfully' });
        }      
        
    } catch (error) {
        res.status(500).json({ message: 'Error creating constituent', error: error.message });
    }
};

exports.deleteConstituent = async (req, res) => {
    try {
        const params = req.params;  

        // Check if constituent is exist      
        const existEmails = await constituentsService.getConstituentById(params.id);

        if (existEmails.length === 0) {        
            res.status(404).json({ message: `Constituent with id = ${params.id} is not exist` });
        }
        else {        
            await constituentsService.deleteConstituentById(params.id);
            res.status(201).json({ message: 'Constituent deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating constituent', error: error.message });
    }
};