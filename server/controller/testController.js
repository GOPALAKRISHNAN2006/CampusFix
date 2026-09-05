export const studentTest = (req, res) => {
    res.json({
        success: true,
        message: "Student route accessed successfully",
        user: req.user
    });
};

export const staffTest = (req, res) => {
    res.json({
        success: true,
        message: "Staff route accessed successfully",
        user: req.user
    });
};

export const adminTest = (req, res) => {
    res.json({
        success: true,
        message: "Admin route accessed successfully",
        user: req.user
    });
};