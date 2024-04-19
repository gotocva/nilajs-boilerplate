import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';


const userSessionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'users'
    },
    session_token: {
        type: String,
        unique: true,
        required: true
    },
    session_meta: {
        type: Object,
    },
    status: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
});

userSessionSchema.index({ session_token: 1 });

userSessionSchema.pre('save', async function (next) {
    try {
        const obj = Object.assign({}, this);
        // this.authentication_token = jwt.sign(obj._doc.email, options.JWT_SECRET);
        // this.password = await bcrypt.hash(this.password, Number(options.BCRYPT_SALT_ROUND));
        next();
    } catch (error) {
        next(error);
    }
});

userSessionSchema.plugin(mongoosePaginate);

export const UserSession = mongoose.model('sessions', userSessionSchema);