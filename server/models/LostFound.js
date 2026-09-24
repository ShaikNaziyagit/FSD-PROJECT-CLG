import mongoose from 'mongoose';

const lostFoundSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Lost', 'Found'],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'Cash / Money',
        'Wallet / Purse',
        'Student ID Card / Keys',
        'Laptop / Phone / Electronics',
        'Earbuds / Headphones',
        'Bags & Backpacks',
        'Books / Calculators / Notes',
        'Clothing / Accessories',
        'Other Belongings',
      ],
      default: 'Wallet / Purse',
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    dateReported: {
      type: Date,
      default: Date.now,
    },
    approximateTime: {
      type: String,
      default: 'Around 01:30 PM',
    },
    rewardAmount: {
      type: Number,
      default: 0,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      default: '',
    },
    contactEmail: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Active', 'Claim Pending', 'Resolved / Returned', 'Handed to Security'],
      default: 'Active',
    },
    claimDetails: {
      claimedBy: String,
      claimantRoll: String,
      verificationProof: String,
      resolvedAt: Date,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const LostFound = mongoose.model('LostFound', lostFoundSchema);
export default LostFound;
