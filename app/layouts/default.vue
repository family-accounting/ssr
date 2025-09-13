<template>
    <nav class="py-4 border-b">
        <div class="container mx-auto">
            <ul class="flex gap-4">
                <ULink to="/">Home</ULink>
                <ULink to="/groups">Groups</ULink>
                <ULink to="/register">Register</ULink>
                <ULink to="/login">Login</ULink>
            </ul>
        </div>
    </nav>
    <main class="container mx-auto">
        <slot />
    </main>
</template>
