import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./AuthContext"; // ← IMPORT USE AUTH

// SECURITY: Email Validation Regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// SECURITY: Phone Validation Regex
const PHONE_REGEX = /^[0-9]{10,}$/;

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth(); // ← AMBIL FUNGSI LOGIN DARI CONTEXT

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Update form data
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama wajib diisi!";
    } else if (formData.nama.trim().length < 3) {
      newErrors.nama = "Nama minimal 3 karakter!";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi!";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Format email tidak valid!";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi!";
    } else if (!PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = "Nomor HP hanya angka, minimal 10 digit!";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter!";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi!";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak sama!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle registration - ⚡ PERUBAHAN PENTING DI SINI!
  const handleRegister = () => {
    if (validateInputs()) {
      // ✅ SIMPAN DATA USER KE CONTEXT SEBELUM NAVIGATE!
      login({
        nama: formData.nama,
        email: formData.email,
        phone: formData.phone,
      });

      Alert.alert(
        "Registrasi Berhasil!",
        `Selamat datang, ${formData.nama}! 👋`,
        [
          {
            text: "Masuk ke Dashboard",
            onPress: () => router.replace("/home"),
          },
        ],
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Buat Akun Baru</Text>
          <Text style={styles.subtitle}>Daftarkan diri kamu sekarang</Text>
        </View>

        <View style={styles.form}>
          {/* Nama Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={[styles.input, errors.nama && styles.inputError]}
              placeholder="Contoh: Budi Santoso"
              value={formData.nama}
              onChangeText={(text) => handleChange("nama", text)}
              autoCapitalize="words"
            />
            {errors.nama && <Text style={styles.errorText}>{errors.nama}</Text>}
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="nama@email.com"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nomor HP</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="08xxxxxxxxxx"
              value={formData.phone}
              onChangeText={(text) => handleChange("phone", text)}
              keyboardType="phone-pad"
              maxLength={15}
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Minimal 6 karakter"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Konfirmasi Password</Text>
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword && styles.inputError,
              ]}
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>DAFTAR SEKARANG ✨</Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkButton}>Login Disini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: { marginBottom: 32 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: { fontSize: 16, color: "#6b7280" },
  form: { width: "100%" },
  inputGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 8 },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 16,
    color: "#1f2937",
  },
  inputError: { borderColor: "#ef4444", backgroundColor: "#fef2f2" },
  errorText: { color: "#dc2626", fontSize: 13, marginTop: 6, marginLeft: 4 },
  button: {
    backgroundColor: "#8b5cf6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#8b5cf6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  linkText: { color: "#6b7280", fontSize: 14 },
  linkButton: { color: "#8b5cf6", fontSize: 14, fontWeight: "bold" },
});
