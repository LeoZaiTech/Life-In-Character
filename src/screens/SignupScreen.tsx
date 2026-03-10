import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signup, clearError } from '../store/auth/authSlice';
import { validationService } from '../services/authService';
import { PasswordStrength } from '../types/auth';

interface SignupScreenProps {
  onNavigateToLogin: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({ onNavigateToLogin }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (password) {
      setPasswordStrength(validationService.checkPasswordStrength(password));
    } else {
      setPasswordStrength(null);
    }
  }, [password]);

  const handleSignup = async () => {
    console.log('[SignupScreen] handleSignup called');
    const validation = validationService.validateSignupForm({
      email,
      username,
      password,
      confirmPassword,
    });

    if (!validation.isValid) {
      console.log('[SignupScreen] Validation failed:', validation.errors);
      setLocalErrors(validation.errors);
      return;
    }

    console.log('[SignupScreen] Validation passed, dispatching signup');
    setLocalErrors({});
    const result = await dispatch(signup({ email, username, password, confirmPassword }));
    console.log('[SignupScreen] Dispatch result:', result);
    console.log('[SignupScreen] Result type:', result.type);
  };

  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
    }
    if (localErrors[field]) {
      setLocalErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const getStrengthColor = (strength: PasswordStrength['label']) => {
    switch (strength) {
      case 'weak':
        return COLORS.error;
      case 'fair':
        return COLORS.warning;
      case 'good':
        return COLORS.success;
      case 'strong':
        return COLORS.primary;
      default:
        return COLORS.textMuted;
    }
  };

  const renderPasswordStrengthIndicator = () => {
    if (!passwordStrength) return null;

    return (
      <View style={styles.strengthContainer}>
        <View style={styles.strengthBarContainer}>
          {[0, 1, 2, 3].map((index) => (
            <View
              key={index}
              style={[
                styles.strengthBar,
                {
                  backgroundColor:
                    index <= passwordStrength.score
                      ? getStrengthColor(passwordStrength.label)
                      : COLORS.border,
                },
              ]}
            />
          ))}
        </View>
        <Text
          style={[
            styles.strengthLabel,
            { color: getStrengthColor(passwordStrength.label) },
          ]}
        >
          {passwordStrength.label.charAt(0).toUpperCase() +
            passwordStrength.label.slice(1)}
        </Text>
        {passwordStrength.suggestions.length > 0 && (
          <Text style={styles.strengthSuggestion}>
            {passwordStrength.suggestions[0]}
          </Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your adventure today</Text>
          </View>

          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, localErrors.email && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={(text) => handleFieldChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                editable={!isLoading}
              />
              {localErrors.email && (
                <Text style={styles.errorText}>{localErrors.email}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={[styles.input, localErrors.username && styles.inputError]}
                placeholder="Choose a username"
                placeholderTextColor={COLORS.textMuted}
                value={username}
                onChangeText={(text) => handleFieldChange('username', text)}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="username"
                editable={!isLoading}
              />
              {localErrors.username && (
                <Text style={styles.errorText}>{localErrors.username}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    localErrors.password && styles.inputError,
                  ]}
                  placeholder="Create a password"
                  placeholderTextColor={COLORS.textMuted}
                  value={password}
                  onChangeText={(text) => handleFieldChange('password', text)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password-new"
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.showPasswordButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              {renderPasswordStrengthIndicator()}
              {localErrors.password && (
                <Text style={styles.errorText}>{localErrors.password}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  localErrors.confirmPassword && styles.inputError,
                ]}
                placeholder="Confirm your password"
                placeholderTextColor={COLORS.textMuted}
                value={confirmPassword}
                onChangeText={(text) => handleFieldChange('confirmPassword', text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password-new"
                editable={!isLoading}
              />
              {localErrors.confirmPassword && (
                <Text style={styles.errorText}>{localErrors.confirmPassword}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.signupButton, isLoading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.text} />
              ) : (
                <Text style={styles.signupButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By signing up, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={onNavigateToLogin} disabled={isLoading}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.md,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  formContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  errorBanner: {
    backgroundColor: COLORS.error + '20',
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.error,
  },
  errorBannerText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.xs,
  },
  inputContainer: {
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs / 2,
  },
  input: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  showPasswordButton: {
    position: 'absolute',
    right: SPACING.sm,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  showPasswordText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  strengthContainer: {
    marginTop: SPACING.xs,
  },
  strengthBarContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: FONT_SIZES.xs - 2,
    fontWeight: '600',
  },
  strengthSuggestion: {
    fontSize: FONT_SIZES.xs - 2,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.xs - 2,
    marginTop: 4,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  signupButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  termsText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZES.xs - 2,
    textAlign: 'center',
    marginTop: SPACING.sm,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.xs / 2,
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
