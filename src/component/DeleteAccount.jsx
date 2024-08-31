import React from 'react';
import './DeleteAccount.css';

const DeleteAccountPolicy = () => {
  return (
    <div>
      <h1>Delete Account Policy</h1>
      <p><strong>Last updated:</strong> August 31, 2024</p>

      <h2>1. Requesting Account Deletion</h2>
      <p>If you wish to delete your Hunt30 account, please follow these steps:</p>
      <ol>
        <li><strong>Log in</strong> to your Hunt30 account.</li>
        <li><strong>Navigate</strong> to the account settings page.</li>
        <li><strong>Select</strong> the "Delete Account" option.</li>
        <li><strong>Confirm</strong> your request by following the on-screen instructions.</li>
      </ol>

      <h2>2. Data Deletion</h2>
      <p>Upon confirming your account deletion request, we will:</p>
      <ul>
        <li>Permanently delete your account and all associated data from our servers.</li>
        <li>Remove your personal information from our active databases.</li>
        <li>Retain certain information as required by law or for legitimate business purposes (e.g., to comply with legal obligations, resolve disputes, and enforce our agreements).</li>
      </ul>

      <h2>3. Processing Time</h2>
      <p>Account deletion requests are typically processed within 30 days. You will receive a confirmation email once your account has been successfully deleted.</p>

      <h2>4. Contact Us</h2>
      <p>If you encounter any issues or have questions about deleting your account, please contact our support team.</p>
    </div>
  );
};

export default DeleteAccountPolicy;
