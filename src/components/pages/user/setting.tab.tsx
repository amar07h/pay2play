import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
export default function SettingTab() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  return (
    <Card className="bg-gaming-dark border-gaming-cyan/20">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">Email Notifications</p>
            <p className="text-sm text-gray-400">
              Receive emails about new products and deals
            </p>
          </div>
          <div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
        </div>

        <Separator className="my-2 bg-gaming-cyan/20" />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-white">SMS Notifications</p>
            <p className="text-sm text-gray-400">
              Receive text messages about your orders
            </p>
          </div>
          <div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
        </div>

        <Separator className="my-2 bg-gaming-cyan/20" />

        <div className="mt-6">
          <Button variant="destructive">Delete Account</Button>
        </div>
      </CardContent>
    </Card>
  );
}
