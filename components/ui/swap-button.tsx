"use client";

import React from 'react';
import { Button, Loader, Alert } from '@mantine/core';

interface SwapButtonProps {
  onClick: () => void;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick, loading, error, success }) => {
  return (
    <div className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <Button
        onClick={onClick}
        disabled={loading}
        color="dark"
        variant="filled"
        style={{ color: 'white', backgroundColor: 'black' }}
      >
        {loading ? <Loader size="sm" /> : 'Execute Swap'}
      </Button>
      {error && <Alert title="Error" color="red" className="mt-4">{error}</Alert>}
      {success && <Alert title="Success" color="green" className="mt-4" dangerouslySetInnerHTML={{ __html: success }} />}
    </div>
  );
};

export default SwapButton;
