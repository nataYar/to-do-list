import '../src/App.css';
import { facebookProvider, githubProvider, googleProvider } from './config/authMethods';
import socialMediaAuth from './service/auth';

const App = () => {
    const handleClick = async (provider) => {
        const res = await socialMediaAuth(provider);
        console.log(res)
    }
    return (
        <div className='loginPage'>
            <header>ToDoApp</header>
            <button onClick={() => handleClick(facebookProvider)}>Facebook</button>
            <button onClick={() => handleClick(googleProvider)}>Google</button>
            <button onClick={() => handleClick(githubProvider)}>GitHub</button>
        </div>
    )

}
export default App;