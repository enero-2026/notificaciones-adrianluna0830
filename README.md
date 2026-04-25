[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/vyZWw41h)
# moviles-react-notificationes

1. Crear un nuevo proyecto
```
   npx create-expo-app notificaciones-app --template
```

El template a escoger será **Blank**

2. Instalar dependencias
```
npx expo install expo-router react-native-safe-area-context react-native-screens @react-native-async-storage/async-storage
```

3. Instalar React Native Paper
```
npx expo install react-native-paper react-native-vector-icons
```

4. Abrir en Expo Go

⚠️ Debes ver la app en tu celular

---

Instalar
```
npx expo install expo-notifications
```

En App.js

```javascript
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
```

Otorgar permisos
```javascript
const pedirPermiso = async () => {
  await Notifications.requestPermissionsAsync();
};

```

Agregar método para notificar
```javascript
const enviarNotificacion = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hola, mundo 🌍",
      body: "Esta es tu primera notificación",
    },
    trigger: null, // Este trigger lo puedes modificar para darle unos segundos de delay, ejemplo: trigger{ seconds: 5 }
  });
};

```

UI:
```javascript
<View style={{ marginTop: 50 }}>
      <Text>Notificaciones</Text>

      <Button title="Pedir permiso" onPress={pedirPermiso} />
      <Button title="Enviar notificación" onPress={enviarNotificacion} />
    </View>

```

⚠️ Esto no funciona bien en el navegador, preferentemente usa Android o iOS (puede pedir permisos)


---
Agregar Contador

Instalar 
```
npx expo install @react-native-async-storage/async-storage
```

En App.js
agregar en la sección de Imports:
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
```

Agregar
```javascript

const [contador, setContador] = useState(0); //declara el contador


useEffect(() => {
    guardarContador(contador);
  }, [contador]);

  const incrementar = () => {
    setContador(contador + 1);
  };

  const guardarContador = async (valor) => {
    try {
      await AsyncStorage.setItem("contador", JSON.stringify(valor));
    } catch (e) {
      console.log("Error guardando");
    }
  };
const cargarContador = async () => {
    try {
      const data = await AsyncStorage.getItem("contador");
      if (data !== null) {
        setContador(JSON.parse(data));
      }
    } catch (e) {
      console.log("Error cargando");
    }
  };
```

UI:
```javascript
 <Text style={{ fontSize: 20 }}>
        Contador: {contador}
      </Text>

      <Button title="Incrementar" onPress={incrementar} />
```

📲 Prueba los cambios en tu celular 

---

Ejercicio:
Conectar el código de Notificación con el de AsyncStorage para enviar una notificación al usuario con el valor del contador

---

Nota: 
Si tienes problemas durante el ejercicio, utiliza el agente de Copilot habilitado en el repositorio de esta asignación, agrega un archivo PROMPT.md con el historial que se genera (copy paste)

