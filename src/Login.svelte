<script>
    import Profile from './Profile.svelte';
    import Todos from './Todos.svelte';

    import { auth, googleProvider , db } from './firebase';
    import { authState } from 'rxfire/auth';
    import { collectionData, docData } from 'rxfire/firestore';
    import { map, filter, switchMap, pluck, startWith } from 'rxjs/operators';

    let user;

    let isAllowed;
    
    const query = (uid) => db.collection('allowed').doc(uid);

    authState(auth).pipe(
        filter(val => !!val),
        switchMap(user => docData(query(user.uid))),
        pluck('allowed'),
        startWith(false),
    ).subscribe(val => { console.log('HEY, ', val); isAllowed = val });

    const unsubscribe = authState(auth).pipe(map(user => (user ? { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL}: null))).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>


<style>
    section {
        background: rgb(235, 235, 235);
        padding: 20px;
    }
</style>

<section>
{#if user}
    {#if isAllowed}
        <Profile {...user} />
        <button on:click={ () => auth.signOut() } class="button">Logout</button>
        <hr>
        <Todos uid={user.uid} />
    {:else}
        Loading...
    {/if}
{:else}
	<button on:click={login} class="button">
		Signin with Google
	</button>
{/if}
</section>