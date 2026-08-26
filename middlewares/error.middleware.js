export const errorMiddleware = (err, req, res, next) => {
        console.error(err.stack);

        if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON in request body",
            });
        }

        if(err.name === "ZodError"){
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: err.errors,
            });
        }

        if (err.code === "P2002") {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
};