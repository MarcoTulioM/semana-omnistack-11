import React from "react";
import { View, Image, Text, TouchableOpacity, Linking } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import styles from "./styles";
import logoImg from "../../assets/logo.png";
import { Feather } from "@expo/vector-icons";

export default function Detatil () {

    const Navigation = useNavigation();

    const route = useRoute();
    const incid = route.params.incid ;

    const message = `Olá ${incid.name}, estou entrando em contato pois gostaria de ajudar no caso ${incid.title} com o valor de ${Intl.NumberFormat("pt-BR", { 
        style: "currency", 
        currency: "BRL"})
    .format(incid.value)}.`;

    function navigateBack () {
        Navigation.goBack();
    }

    function sendMail () {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incid.title}`,
            recipients: [incid.email],
            body: message
        });
    }

    function sendWhatsapp () {
        Linking.openURL(`whatsapp://send?phone=${incid.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity 
                        onPress={ navigateBack }
                    >
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incid.name}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incid.description}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat("pt-BR", { 
                    style: "currency", 
                    currency: "BRL"})
                .format(incid.value)}</Text>
            </View>

                    <View style={styles.contactBox}>
                        <Text style={styles.heroTitle}>Salve o dia!</Text>
                        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                        <Text style={styles.heroDescription}> Entre em contato:</Text>

                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.action} onPress={ sendWhatsapp }>
                                <Text style={styles.actionText}>WhatsApp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.action} onPress={ sendMail }>
                                <Text style={styles.actionText}>E-mail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
        </View>
    );
}