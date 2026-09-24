import mongoose from 'mongoose';

const feePaymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      default: 'CSE',
    },
    feeType: {
      type: String,
      required: true,
      enum: [
        'Semester Tuition Fee',
        'Semester Examination Fee',
        'Hostel & Mess Charges',
        'Campus Transport / Bus Pass',
        'Library & Laboratory Deposit',
        'Alumni & Development Fund',
      ],
    },
    academicYear: {
      type: String,
      default: '2025-2026',
    },
    semester: {
      type: Number,
      default: 6,
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Overdue', 'Processing'],
      default: 'Pending',
    },
    paidAt: Date,
    transactionId: String,
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Net Banking', 'Credit/Debit Card', 'Campus Wallet', 'Bank Demand Draft'],
    },
    receiptNumber: String,
    breakdown: [
      {
        item: String,
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

const FeePayment = mongoose.model('FeePayment', feePaymentSchema);
export default FeePayment;
