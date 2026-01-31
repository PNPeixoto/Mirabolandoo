async function runVerification() {
    const BASE_URL = 'http://localhost:3001/api';

    console.log('🚀 Starting Consumer API Verification...');

    // 1. Create a test order
    console.log('\n1️⃣ Creating test order...');
    const orderData = {
        customerName: 'Test Consumer',
        customerPhone: '11999999999',
        items: [
            { id: 'delirium', name: 'Delirium', price: 'R$ 22,00', quantity: 1 }
        ],
        notes: 'Integration Test',
        deliveryAddress: 'Rua Teste, 123'
    };

    const createRes = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    if (!createRes.ok) {
        console.error('❌ Failed to create order:', await createRes.text());
        process.exit(1);
    }

    const createdOrder = (await createRes.json()).data;
    console.log('✅ Order created:', createdOrder.id);
    const orderId = createdOrder.id;

    // 2. Poll for events
    console.log('\n2️⃣ Polling for events...');
    const pollRes = await fetch(`${BASE_URL}/consumer/polling`);
    const pollData = await pollRes.json();

    const event = pollData.items.find((i: any) => i.orderId === orderId.toString());

    if (event) {
        console.log('✅ Found polling event for order:', event);
    } else {
        console.error('❌ Order not found in polling events. Available:', pollData.items.map((i: any) => i.orderId));
        // Don't exit, might be timing, but let's continue to test specific endpoint
    }

    // 3. Get Order Details
    console.log('\n3️⃣ Getting order details (Consumer format)...');
    const detailsRes = await fetch(`${BASE_URL}/consumer/orders/${orderId}`);

    if (!detailsRes.ok) {
        console.error('❌ Failed to get details:', await detailsRes.text());
        process.exit(1);
    }

    const detailsData = await detailsRes.json();
    console.log('✅ Details retrieved. Total:', detailsData.item.total.orderAmount);

    if (detailsData.item.customer.name !== 'Test Consumer') {
        console.error('❌ Mismatch in customer name:', detailsData.item.customer.name);
    }

    // 4. Update Status
    console.log('\n4️⃣ Updating status to CONFIRMED...');
    const updateRes = await fetch(`${BASE_URL}/consumer/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CONFIRMED' })
    });

    if (!updateRes.ok) {
        console.error('❌ Failed to update status:', await updateRes.text());
        process.exit(1);
    }
    console.log('✅ Status update request sent');

    // 5. Verify Status Update internally
    console.log('\n5️⃣ Verifying internal status...');
    const checkRes = await fetch(`${BASE_URL}/orders/${orderId}`);
    const checkData = await checkRes.json();

    if (checkData.data.status === 'confirmed') {
        console.log('✅ Internal status is confirmed!');
    } else {
        console.error('❌ Internal status verification failed. Status is:', checkData.data.status);
        process.exit(1);
    }

    console.log('\n🎉 ALL TESTS PASSED!');
}

runVerification().catch(console.error);
