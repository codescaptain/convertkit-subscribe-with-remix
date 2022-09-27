import { ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

export let action: ActionFunction = async ({request}) => {
    let formmData = await request.formData();
    let email = formmData.get("email")
    
    const API_KEY = process.env.CONVERTKIT_KEY;
    const FORM_ID = "3651578";
    const API = "https://api.convertkit.com/v3/";

    let res = await fetch(`${API}/forms/${FORM_ID}/subscribe`,{
        method: "post",
        body: JSON.stringify({email, api_key: API_KEY}),
        headers:{
            "Content-Type": "application/json; charset=utf-8",
        }

    })
    
    return res.json();
    
}

export default function Newsletter() {
    let actionData = useActionData();
    let state: "idle" | "success" | "error" = actionData?.subscription 
    ? "success"
    : actionData?.error
    ? "error"
    : "idle";

    return (
        <main>
        
            <Form method="post" aria-hidden={state === "success"}>
                <h2>Subscribe</h2>
                <p>Don't miss any of the action</p>
                <fieldset>
                    <input type="email" name="email" placeholder="codescaptain@gmail.com" />
                    <button type="submit"> Subscribe</button>
                </fieldset>
            </Form>
            <p>
                {actionData?.error ? (
                    actionData.message
                ): <>&nbsp;</>}
            </p>
            <div aria-hidden={state !== "success"}>
                <h2>You're subscribed!</h2>
                <p>Check your emalk to confirm your subscription</p>
                <Link to=".">Start over</Link>
            </div>
        </main>
    )

}