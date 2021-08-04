from channels.generic.websocket import AsyncJsonWebsocketConsumer

class NotificationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def receive_json(self, text_data=None, bytes_data=None):
        await self.send_json({
            'test': 1
        })

    async def disconnect(self, close_code):
        await self.close()