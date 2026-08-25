export const errorMiddleware = (err, req, res, next) => {
        console.error(err.stack);

        if(err.name === "ZodError"){
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: err.errors,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
};