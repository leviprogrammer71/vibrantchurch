import { useState } from 'react';
import { Heart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// PayPal giving link
const PAYPAL_GIVING_URL = 'https://www.paypal.com/donate/?hosted_button_id=4GTZXSK6DTAGC';

const DONATION_TYPES = [
  { value: 'tithe', label: 'Tithes' },
  { value: 'offering', label: 'Offering' },
  { value: 'missions', label: 'Missions' },
  { value: 'building', label: 'Building Fund' },
  { value: 'general', label: 'General Donation' },
];

interface CustomDonationFormProps {
  className?: string;
}

export function CustomDonationForm({ className }: CustomDonationFormProps) {
  const [donationType, setDonationType] = useState('general');
  const [amount, setAmount] = useState('');

  const handleDonate = () => {
    // For now, open the existing PayPal hosted button link
    // The donation type and amount are captured for future integration
    // PayPal's hosted button handles the actual payment processing
    const selectedType = DONATION_TYPES.find(t => t.value === donationType)?.label || 'General Donation';
    
    // Build URL with item description (PayPal will show this in the donation)
    const url = new URL(PAYPAL_GIVING_URL);
    if (amount) {
      url.searchParams.set('amount', amount);
    }
    url.searchParams.set('item_name', `${selectedType} - Vibrant Church`);
    
    window.open(url.toString(), '_blank');
  };

  const isValidAmount = amount === '' || (parseFloat(amount) > 0 && !isNaN(parseFloat(amount)));

  return (
    <div className={`space-y-6 ${className || ''}`}>
      {/* Donation Type Dropdown */}
      <div className="space-y-2">
        <Label htmlFor="donation-type" className="text-sm font-medium text-foreground">
          What are you giving toward?
        </Label>
        <Select value={donationType} onValueChange={setDonationType}>
          <SelectTrigger id="donation-type" className="w-full bg-background">
            <SelectValue placeholder="Select donation type" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {DONATION_TYPES.map(type => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <Label htmlFor="donation-amount" className="text-sm font-medium text-foreground">
          Amount (optional)
        </Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="donation-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
        {!isValidAmount && (
          <p className="text-xs text-destructive">Please enter a valid amount</p>
        )}
      </div>

      {/* Donate Button */}
      <Button 
        size="lg"
        className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold py-4 rounded-lg shadow-lg gap-2"
        onClick={handleDonate}
        disabled={!isValidAmount}
      >
        <Heart className="w-5 h-5" />
        Donate with PayPal
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Secure giving powered by PayPal
      </p>
    </div>
  );
}
